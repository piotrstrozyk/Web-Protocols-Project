import classes from './style.module.css'

const Sidebar = () => {
    const divsArray = Array.from({ length: 5 }, (value, index) => (
        <div key={index} className="custom-div">
          Div {index + 1}
        </div>
      ));
  return (
    <div className={classes.sidebar}>{divsArray}</div>
  )
}

export default Sidebar