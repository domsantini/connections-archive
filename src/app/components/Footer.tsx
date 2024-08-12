import Link from "next/link";

function Footer() {
  return (
    <footer className='flex justify-center items-center py-2'>
      <p>Made with 💙 by <Link className='underline' href='https://github.com/domsantini' target="_blank">Dom</Link> for the Pals</p>
    </footer>
  )
}

export default Footer;