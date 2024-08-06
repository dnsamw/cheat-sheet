import '../../assets/scss/letter-avatar.scss'
type Props = {
    text:string;
}

function LetterAvatar({text}: Props) {

  const letter = text.slice(0,1).toUpperCase()
  const rendomBgColor = Math.floor(Math.random()*16777215).toString(16)

  return (
    <div className="letter-avatar" style={{backgroundColor: `#${rendomBgColor}`}}>{letter}</div>
  )
}

export default LetterAvatar