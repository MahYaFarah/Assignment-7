import Link from "next/link";

export default function NotFound() { return <div className="container not-found"><div><div className="code">404</div><h1>পাতাটি খুঁজে পাওয়া যায়নি</h1><p>লিংকটি সঠিক নয় অথবা পাতাটি সরিয়ে নেওয়া হয়েছে।</p><Link className="primary-button" href="/">হোম পেজে ফিরে যান</Link></div></div>; }
