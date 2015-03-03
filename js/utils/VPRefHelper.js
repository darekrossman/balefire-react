export default {

  ref(site, omniPageName, isSocial = true) {
    let channel;
    switch(site) {
      case 'facebook': 
        channel = 'FBSOCIAL-';
        break;
      case 'twitter':
        channel = 'TWSOCIAL-';
        break;
      case 'pinterest':
        channel = 'PISOCIAL-';
        break;
      case 'google':
        channel = 'GPSOCIAL-';
        break;
      case 'email':
        channel = 'ShareLandingEM-'
        break;
    }

    return channel + omniPageName;
  }

}