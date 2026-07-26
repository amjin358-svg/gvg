import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="聯絡我們"
        en="Contact Us"
        lead="無論詢價、供應商合作或一般諮詢，歡迎留下需求，我們將盡快與您聯繫。"
      />
      <div className="page-body">
        <div className="contact-layout">
          <form className="contact-form" id="rfq" action="#" method="post">
            <h2>立即詢價 / RFQ</h2>
            <div className="form-grid">
              <label>
                公司名稱
                <input name="company" placeholder="您的公司名稱" required />
              </label>
              <label>
                聯絡人
                <input name="name" placeholder="姓名" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="name@company.com" required />
              </label>
              <label>
                需求類型
                <select name="type" defaultValue="rfq">
                  <option value="rfq">產品詢價</option>
                  <option value="supplier">供應商合作</option>
                  <option value="general">一般諮詢</option>
                </select>
              </label>
              <label>
                需求說明
                <textarea
                  name="message"
                  placeholder="請描述產品、數量、目標市場與交期…"
                  required
                />
              </label>
              <button type="submit" className="btn btn--primary">
                送出需求
              </button>
            </div>
          </form>

          <aside className="contact-panel" id="supplier">
            <h2>聯絡資訊</h2>
            <ul>
              <li>Email：trade@globalvistagroup.com</li>
              <li>電話：+886 2 0000 0000</li>
              <li>服務時間：週一至週五 09:00–18:00（UTC+8）</li>
              <li id="chat">線上客服：透過右側快捷列或表單留言</li>
              <li id="login">會員登入／註冊功能建置中，歡迎先以表單聯繫。</li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
