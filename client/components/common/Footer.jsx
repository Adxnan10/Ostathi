import Link from 'next/link'
export default function Footer() {
  return (
    <footer id="footer-common" className="footer-bs mt-auto">
      <div className="container-fluid overflow-hidden">

        <div className="d-flex justify-content-center mb-3 align-items-center">
          <Link href={"/"}>
            <img className="my-auto footer-right-border" id="footer-img" src="logo.svg" alt="Logo" />
          </Link>
          <p className="my-auto footer-padding" id="footer-text">Your new way of learning</p>
        </div>

        <div className="d-flex justify-content-center mb-5" style={{ width: '40%', alignItems: 'center', margin: '0 auto' }}>
          <a href="#" className="footer-links"> <p className="my-auto footer-padding"> Careers </p> </a>
          <a href="#" className="footer-links"> <p className="my-auto footer-padding footer-left-border"> Privacy Policy </p> </a>
          <a href="#" className="footer-links"> <p className="my-auto footer-padding footer-left-border"> Terms & Conditions </p> </a>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <p className="my-auto"> © 2023 Ostathi Inc. </p>
        </div>

      </div>
    </footer>
  )
}
