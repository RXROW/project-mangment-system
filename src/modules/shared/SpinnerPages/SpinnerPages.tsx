import styles from './SpinnerPages.module.css'

function SpinnerPages() {
  return (
    <div className=" d-flex justify-content-center align-items-center vh-100">
      <div className={styles['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default SpinnerPages
