import '../assets/scss/cheat-form.scss'

type Props = {}

function CheatForm({}: Props) {
  return (
    <form>
        <div className='input-unit'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
        </div>
        <div className='input-unit'>
            <label htmlFor="text">Text</label>
            <textarea name="text" id="text" />
        </div>
        <div className='input-unit'>
            <label htmlFor="code">Code</label>
            <textarea name="code" id="code" />
        </div>
    </form>
  )
}

export default CheatForm