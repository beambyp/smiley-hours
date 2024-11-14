import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer style={footerWrapperStyle}>
        <div style={footerTopStyle}>
            <div style={containerStyle}>
                <div style={sectionStyle}>
                <h4>เกี่ยวกับเรา</h4>
                <p>Psychologist Consultation System</p>
                </div>
                <div style={sectionStyle}>
                <h4>เมนู</h4>
                <ul style={listStyle}>
                    <li>
                        <Link href="/" style={linkStyle}>
                        หน้าหลัก
                        </Link>
                    </li>
                    <li>
                        <Link href="/consultants" style={linkStyle}>
                        ผู้ให้คำปรึกษา
                        </Link>
                    </li>
                    <li>
                        <Link href="/articles" style={linkStyle}>
                        บทความ
                        </Link>
                    </li>
                </ul>
                </div>
                <div style={sectionStyle}>
                <h4>ติดต่อกับเรา</h4>
                <p>084 226 2999</p>
                </div>
            </div>
        </div>

        <div style={footerBottomStyle}>
            <div style={LogoStyle}>
                <Image src="/logo/fontlogowhite.png" alt="White Logo" width={110} height={80} />
            </div>
            <div style={IconStyle}>
                <Image src="/icon/facebook.png" alt="facebook" width={25} height={24} />
            </div>
            <div style={IconStyle2}>
                <Image src="/icon/line.png" alt="line" width={22} height={22} />
            </div>
            <div style={IconStyle3}>
                <Image src="/icon/phone.png" alt="phone" width={22} height={22} />
            </div>
        </div>
    </footer>
  );
};

const footerWrapperStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    width: "100%",
};

const footerTopStyle: React.CSSProperties = {
  backgroundColor: "#378CDE", 
  color: "white",
  padding: "20px 0",
};

const footerBottomStyle: React.CSSProperties = {
    backgroundColor: "#2B6EB0", 
    color: "white",
    padding: "20px 0",
  };

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10%",
  maxWidth: "2000px",
};

const LogoStyle: React.CSSProperties = {
    position: "fixed",
    bottom: -11,
    width: "100%",
    padding: "20px 0",
    left: "4%",
};
const IconStyle: React.CSSProperties = {
    position: "fixed",
    bottom: -11.5,
    width: "100%",
    padding: "20px 0",
    left: "91%",
};

const IconStyle2: React.CSSProperties = {
    position: "fixed",
    bottom: -11,
    width: "100%",
    padding: "20px 0",
    left: "93%",
};

const IconStyle3: React.CSSProperties = {
    position: "fixed",
    bottom: -11,
    width: "100%",
    padding: "20px 0",
    left: "95%",
};

const sectionStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 10%",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: "0",
};

const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
};
export default Footer;
