import '../../assets/scss/item-info.scss'

type Props = {}

function ItemInfo({}: Props) {
  return (
    <div className='item-info'>
        <div className="img-container">
        <img src="/dnsam.jpg" alt="dnsam"/>
        </div>
        <div className="info-container">
        <p>dnsam</p>
        <p>2024-08-11</p>
        <p>1:00 PM</p>
        </div>
    </div>
  )
}

export default ItemInfo