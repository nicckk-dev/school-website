import { CardComp } from './CardComp'
import CommHeader from "./CommHeader"


export const CommonCard = () => {
    const cardprops = {
        gutter: 24,
        span: 8,
         onChange: (e)=>(
            console.log(e)
         )
         
       // onClick: e => console.log(e.target.value),
    }

    const data = [
        { drName: 'Anuj Taneja', designation: 'Chest Physician TB Specialist', class: 'Class Pre MSL/VF(0)', pcode: '1111111', mslCode: 'abcd12345', location: 'Kolkata' },
        { drName: 'Anuj Taneja', designation: 'Chest Physician TB Specialist', class: 'Class Pre MSL/VF(0)', pcode: '2222222', mslCode: 'abcd12345', location: 'Kolkata' },
        { drName: 'Anuj Taneja', designation: 'Chest Physician TB Specialist', class: 'Class Pre MSL/VF(0)', pcode: '3333333', mslCode: 'abcd12345', location: 'Kolkata' },
        { drName: 'Anuj Taneja', designation: 'Chest Physician TB Specialist', class: 'Class Pre MSL/VF(0)', pcode: '4444444', mslCode: 'abcd12345', location: 'Kolkata' },
        { drName: 'Anuj Taneja', designation: 'Chest Physician TB Specialist', class: 'Class Pre MSL/VF(0)', pcode: '5555555', mslCode: 'abcd12345', location: 'Kolkata' },
    ]

    return (
        <>

            <CommHeader title="Profile Cards" />
            <CardComp props={cardprops} data={data} checkboxBtn={true} />
        </>
    )
}