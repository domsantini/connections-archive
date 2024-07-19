import Link from "next/link";

function Footer() {
  return (
    <div className='flex justify-center items-center py-2'>
      <p>Made with 💙 by <Link className=' underline' href='https://github.com/domsantini'>Dom</Link> for the Pals</p>
    </div>
  )
}

export default Footer;