import classes from './style.module.css'

const SidebarRight = () => {
    const divsArray = Array.from({ length: 5 }, (value, index) => (
        <div key={index} className="custom-div">
          Div {index + 1}
        </div>
      ));
  return (
    <div className={classes.sidebarRight}>{divsArray}</div>
  )
}

export default SidebarRight