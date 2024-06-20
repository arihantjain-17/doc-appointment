import DocCard from "./DocCard";


import "./Doctor.css"


const Doctor = ({doctors}) => {
  return (
    <div className="cards">
       {
         doctors.map((doctor,id) => {
                return <DocCard key={id} {...doctor}/>

       })
               
        }
    </div>
  )
}



export default Doctor;
