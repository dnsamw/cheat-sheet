import { Timestamp } from 'firebase/firestore';
import '../../assets/scss/item-info.scss'

type Props = {
  timestamp?: Timestamp
}

function ItemInfo({timestamp}: Props) {
  const getTimestamp = () => {
    if (timestamp) {
      return new Date(timestamp.seconds*1000).toLocaleDateString() + ` @ ${new Date(timestamp.seconds*1000).toLocaleTimeString()}`;
    }
  }
  return (
    <div className='item-info'>
        <div className="img-container">
        <img src="/dnsam.jpg" alt="dnsam"/>
        </div>
        <div className="info-container">
          <p className='username'>dnsam</p>
          <p className='date'>{getTimestamp() || "__:__:__"}</p>
        </div>
    </div>
  )
}

export default ItemInfo