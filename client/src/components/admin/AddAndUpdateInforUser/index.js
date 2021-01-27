import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import CurriculumVitae from "./CurriculumVitae"
const AddAndUpdateInforUser = (props) =>{
    return(
        <CurriculumVitae idUser = {props.match.params.id}/>
    )
}
export default AddAndUpdateInforUser;