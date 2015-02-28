import { Store } from 'flummox';
import Immutable from 'immutable';

class AppStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step

    let appActionIds = flux.getActionIds('app')
    this.register(appActionIds.notify, this.handleNotification)
   
    this.state = {
      notifications: Immutable.List()
    };
  }

  handleNotification(payload) {
    let message = payload.msg
    this.setState({
      notifications: this.state.notifications.push(message)
    })
  }

  getNotification() {
    let it = this.state.notifications.get(0)
    this.setState({
      notifications: this.state.notifications.shift()
    })
    return it;
  }

}

export default AppStore;