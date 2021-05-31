import React, { useState } from "react";
import {Accordion, AccordionSummary, AccordionDetails,  Typography, } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function DistrictsAccordion(props) {
  console.log(props);
    const [districts, setDistricts] = useState();
    setDistricts(props.accdistricts)
    // console.log(districts);
    return(
      <div>
        {console.log(districts)}
      {districts!==undefined ? districts.map((dist, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography /* className={classes.heading} */>
              {dist.district_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo
              lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) : "Nothing to show"}
    </div>
    );
}

export default DistrictsAccordion;