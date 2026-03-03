export default function FontSizer (screenWidth) {
  if (screenWidth > 400) {
    return 20;
  } else if (screenWidth > 250) {
    return 14;
  } else { 
    return 12;
  }
}