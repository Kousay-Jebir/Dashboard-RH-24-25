import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TicketKPI from '../components/TicketKPI';
import { api } from '../service/api';
import useApi from '../service/useApi';

const AllTicketsKPI = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const {data:totalMembers}=useApi(api.getTotalMember,NaN)
  const {data:totalTeamBuildings}=useApi(api.getTotalTeamBuilding,NaN)
  const {data:totalMeetings}=useApi(api.getTotalMeeting,NaN)


  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    //vertical: true, // for veritcal sliding 

  };


  const kpiData = [
    { title: "Total members", value: `${totalMembers.data?.totalMembers}`, icon: <PersonIcon /> },
    { title: "Total Workshops", value: "15", icon: <WbSunnyIcon /> },
    { title: "Team Buildings", value: `${totalTeamBuildings.data?.totalMeetings}`, icon: <WhatshotIcon /> },
    { title: "Meetings", value: `${totalMeetings.data?.totalMeetings}`, icon: <ChatIcon /> },
  ];

  return (
    <Grid container spacing={2} marginBottom={1}>
      {isXs ? (
        <Grid item xs={12}>
          <Slider {...settings}>
            {kpiData.map((data, index) => (
              <div key={index}>
                <TicketKPI
                  title={data.title}
                  value={data.value}
                  icon={data.icon}
                />
              </div>
            ))}
          </Slider>
        </Grid>
      ) : (
        kpiData.map((data, index) => (
          <Grid item xs={3} key={index}>
            <TicketKPI
              title={data.title}
              value={data.value}
              icon={data.icon}
            />
          </Grid>
        ))
      )}
      
    </Grid>
  );
};

export default AllTicketsKPI;
