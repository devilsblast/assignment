import React from 'react'
import { returnPaginationRange } from '../apputils'

function Pagination(props) {
  let array = returnPaginationRange(props.totalPage, props.page, props.limit, props.siblings);
  return (
<ul className=" pagination pagination-md justify-content-end  ">
        <li className="page-item"><span onClick={() => props.onPageChange("&laquo;")} className="page-link fs-4 fw-bold">&laquo;</span></li>
        <li className="page-item"><span onClick={() => props.onPageChange("&lsaquo;")}className="page-link fs-4 fw-bold">&lsaquo;</span></li>
        {array.map(value => {
          if(value === props.page){
            return(
          <li key={value} className="page-item active"><span onClick={() => props.onPageChange(value)}className="page-link fs-4 fw-bold">{value}</span></li>
          
        )}
          else{
            return(
            <li key={value} className="page-item a"><span onClick={() => props.onPageChange(value)} className="page-link fs-4 fw-bold">{value}</span></li>
          
        )}
          })} 
        <li className="page-item"><span onClick={() => props.onPageChange("&rsaquo;")} className="page-link fs-4 fw-bold">&rsaquo;</span></li>
        <li className="page-item"><span onClick={() => props.onPageChange("&raquo;")}className="page-link fs-4 fw-bold">&raquo;</span></li>
    </ul>
  )
}

export default Pagination