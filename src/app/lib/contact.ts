export const CONTACT_EMAIL = "productivelakshay@gmail.com";
export const WHATSAPP_NUMBER = "919315230455";
export const WHATSAPP_DISPLAY = "+91 93152 30455";

export function whatsappUrl(message = "Hi Motion Studio team, I'd like to discuss a project.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
