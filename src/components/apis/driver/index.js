import apiClient2 from "./apiClient2";
export const getAlldrivers=(pageNumber,pageSize)=>{
    const { liscenceType, truckType, driverStatus, workingArea } ={};
   return apiClient2.get(`/drivers?include=supplier`,{
        params:{
            ...(pageNumber &&{'page[number]':pageNumber}),
            ...(pageSize &&{'page[size]':pageSize}),
            ...(liscenceType &&{'filter[liscence_type]':liscenceType}),
            ...(liscenceType &&{'filter[liscence_type]':liscenceType}),
            ...(truckType &&{'filter[truck_type_id]':truckType}),
            ...(driverStatus &&{'filter[qa_status]':driverStatus}),
            ...(workingArea &&{'filter[working_governates]':workingArea})
        }
    }).then((response)=>{
         return response;
    });

};
  