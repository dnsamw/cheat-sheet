import '../../assets/scss/item-info.scss'

type Props = {}

function ItemInfo({}: Props) {
  return (
    <div className='item-info'>
        <div className="img-container">
        <img src="/dnsam.jpg" alt="dnsam"/>
        </div>
        <div className="info-container">
          <p className='username'>dnsam</p>
          <p className='date'>2024-08-11 @ 1:00 PM</p>
        </div>
    </div>
  )
}

export default ItemInfo