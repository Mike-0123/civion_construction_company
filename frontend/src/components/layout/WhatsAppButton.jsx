import { companyInfo } from '../../constants/siteConfig'

// WhatsApp number is stored in siteConfig.js → companyInfo.whatsapp
// Format: international digits only, no + or spaces (e.g. 250788208488)
export default function WhatsAppButton() {
  const url = `https://wa.me/${companyInfo.whatsapp}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe5d] transition-transform hover:scale-110"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.845 1.784 6.907L2 30l7.284-1.757A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.471a11.43 11.43 0 0 1-5.82-1.594l-.418-.247-4.327 1.044 1.072-4.215-.272-.432A11.44 11.44 0 0 1 4.53 16.003c0-6.323 5.15-11.471 11.473-11.471 6.322 0 11.47 5.148 11.47 11.471 0 6.324-5.148 11.468-11.47 11.468zm6.29-8.583c-.345-.172-2.04-1.006-2.355-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.712-1.025-.914-1.717-2.042-1.917-2.387-.2-.345-.021-.532.15-.703.155-.155.345-.402.517-.603.173-.2.23-.345.345-.575.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.673-.564-.582-.776-.593l-.661-.011c-.23 0-.603.086-.919.432-.315.345-1.205 1.177-1.205 2.87 0 1.695 1.234 3.332 1.406 3.562.172.23 2.428 3.707 5.882 5.197.823.355 1.465.567 1.966.726.826.263 1.578.226 2.172.137.662-.099 2.04-.833 2.328-1.638.287-.804.287-1.493.2-1.637-.086-.143-.315-.23-.66-.402z"/>
      </svg>
    </a>
  )
}
