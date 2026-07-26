/**
 * Container DI smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Container,
  createToken,
  defineInject,
  lazySingleton,
  singleton,
  clearSingleton,
} from "./index";

describe("@gvg/core/container", () => {
  it("resolves value, factory, class, and singleton lifetime", () => {
    const CONFIG = createToken<{ env: string }>("config");

    class Logger {
      constructor(readonly config: { env: string }) {}
      info(msg: string) {
        return `[${this.config.env}] ${msg}`;
      }
    }
    defineInject(Logger, [CONFIG]);

    const container = new Container();
    container
      .register({ token: CONFIG, useValue: { env: "test" } })
      .register({ token: Logger, useClass: Logger, lifetime: "singleton" });

    const a = container.resolve(Logger);
    const b = container.resolve(Logger);
    assert.equal(a, b);
    assert.equal(a.info("boot"), "[test] boot");
  });

  it("supports defineInject without decorator emit", () => {
    const NAME = createToken<string>("name");

    class Greeter {
      constructor(readonly name: string) {}
      hello() {
        return `Hello, ${this.name}`;
      }
    }
    defineInject(Greeter, [NAME]);

    const container = new Container();
    container
      .register({ token: NAME, useValue: "GVG" })
      .register({ token: Greeter, useClass: Greeter });

    assert.equal(container.resolve(Greeter).hello(), "Hello, GVG");
  });

  it("creates child scoped instances", () => {
    const ID = createToken<number>("id");
    let seq = 0;
    const root = new Container();
    root.register({
      token: ID,
      useFactory: () => ++seq,
      lifetime: "scoped",
    });

    const child = root.createChild();
    assert.equal(child.resolve(ID), 1);
    assert.equal(child.resolve(ID), 1);
    child.clearScope();
    assert.equal(child.resolve(ID), 2);
  });

  it("detects circular dependencies", () => {
    const A = createToken("A");
    const B = createToken("B");
    const container = new Container();
    container.register({
      token: A,
      useFactory: (resolve) => resolve(B),
    });
    container.register({
      token: B,
      useFactory: (resolve) => resolve(A),
    });
    assert.throws(() => container.resolve(A), /Circular dependency/);
  });

  it("lazySingleton and process singleton helpers", () => {
    let n = 0;
    const get = lazySingleton(() => ++n);
    assert.equal(get(), 1);
    assert.equal(get(), 1);

    clearSingleton("test.counter");
    const value = singleton("test.counter", () => ({ n: 42 }));
    assert.equal(singleton("test.counter", () => ({ n: 0 })), value);
    clearSingleton("test.counter");
  });
});
