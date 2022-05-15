/**
 * Formats the digits entered in the phone number field (located on Sign Up Page)
 * @source https://tomduffytech.com/how-to-format-phone-number-in-javascript/ 
 **/
export function formatPhoneNumber(value) {
  if (!value) return value;

  // Regular expression to replace 
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}
