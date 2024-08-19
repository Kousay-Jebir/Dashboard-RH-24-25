import React from 'react';
import Experience from './Experience';
import GeneralInformation from './GeneralInformation';
import PersonalQuestions from './PersonalQuestions';

const AllQuestions=()=>{
    return(
    <div>
       <GeneralInformation/>
       <PersonalQuestions/>
       <Experience/>

    </div>
    )
}
export default AllQuestions;