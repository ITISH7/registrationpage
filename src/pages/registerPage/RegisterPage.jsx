import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import image from "../../assets/logonavbar.png";
import axios from "axios";
import Modal from "./components/Ui/Modal";
import Card from "./components/Ui/card";
import styles from "./registerpage.module.css";
import { FormLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Trash } from "tabler-icons-react";
import Grid from "@mui/material/Grid";
// valid adhar number testing :- 367598346015
import {
  Card as CardMui,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
function getSteps(maxsize, fees) {
  if (maxsize > 1 && fees > 0) {
    return [
      "Basic information",
      "Team related",
      "Registration Payment",
      "Final Submit",
    ];
  } else if (fees > 0) {
    return ["Basic information", "Registration Payment", "Final Submit"];
  } else if (maxsize === 1) {
    return ["Basic information", "FinalSubmit"];
  } else {
    return ["Basic information", "Team related", "Final submit"];
  }
}

function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
}
function checkduplicateArray(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i != j && array[i] === array[j]) {
        return false;
      }
    }
  }
  return true;
}
function validateAdhaar(aadhaar_number) {
  // Regex to check valid
  // aadhaar_number
  let regex = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);

  // if aadhaar_number
  // is empty return false
  if (aadhaar_number == null) {
    return "false";
  }

  // Return true if the aadhaar_number
  // matched the ReGex
  if (regex.test(aadhaar_number) === true) {
    return "true";
  } else {
    return "false";
  }
}

const BasicDetails = (props) => {
  const [email, setemail] = useState("");
  const emailHandler = (event) => {
    setemail(event.target.value);
  };
  const [fullName, setFullName] = useState("");
  const fullnameHandler = (event) => {
    setFullName(event.target.value);
  };
  const [Phonenumber, setPhoneName] = useState("");
  const phonenumberHandler = (event) => {
    setPhoneName(event.target.value);
  };
  const [adharnumber, setadharnumber] = useState("");
  const adharnumberhandler = (event) => {
    setadharnumber(event.target.value);
  };
  const [gender, setgender] = useState(null);
  const genderhandler = (event) => {
    setgender(event.target.value);
  };
  const [collegename, setcollegename] = useState("");
  const collegenameHandler = (event) => {
    setcollegename(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      (email !== "" && validateEmailAddress(email) === -1) ||
      fullName === "" ||
      email == "" ||
      Phonenumber === "" ||
      validateAdhaar(adharnumber) === "false" ||
      gender === null ||
      collegename === ""
    ) {
      alert("you have given wrong details in registration please correct it ");
    } else {
      console.log({
        email: email,
        name: fullName,
        phone_no: Phonenumber,
        aadhar_no: adharnumber,
        gender: gender,
        college: collegename,
      });
      const finalstep = props.activeStep < props.length - 2 ? false : true;
      props.nextstep(
        {
          email: email,
          name: fullName,
          phone_no: Phonenumber,
          aadhar_no: adharnumber,
          gender: gender,
          college: collegename,
        },
        props.activeStep + 1,
        finalstep
      );
    }
  };
  return (
    <>
      <Card className={styles.inputclass}>
        <form onSubmit={submitHandler}>
          <TextField
            id="user-name"
            label="Your Name"
            variant="outlined"
            placeholder="Enter your Full Name"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={fullnameHandler}
          />
          <TextField
            id="email"
            label="Your Email"
            variant="outlined"
            placeholder="Enter your Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={emailHandler}
          />
          <TextField
            id="Phone-number"
            label="Your Phone Number"
            variant="outlined"
            placeholder="Enter your Phone Number"
            fullWidth
            margin="normal"
            value={Phonenumber}
            onChange={phonenumberHandler}
          />

          <TextField
            id="adhaar-number"
            label="Your  Adhaar Card number"
            variant="outlined"
            placeholder="Enter your Adhaar  card number"
            fullWidth
            margin="normal"
            value={adharnumber}
            onChange={adharnumberhandler}
          />
          <TextField
            id="college-detail"
            label="Your  College Name"
            variant="outlined"
            placeholder="Enter your College Name"
            fullWidth
            margin="normal"
            value={collegename}
            onChange={collegenameHandler}
          />

          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={genderhandler}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleNext}
            type="submit"
          >
            {props.activeStep === props.length - 1 ? "Submit " : "Next"}
          </Button>
        </form>
      </Card>
    </>
  );
};
const TeamDetails = (props) => {
  const { adharno } = props;
  const [aadharlist, setaadharlist] = useState(adharno);
  const [TeamMember, setTeamMember] = useState([]);
  const [cardIsShown, SetCartIsShown] = useState(false);
  const hideCardHandler = () => {
    SetCartIsShown(false);
  };
  const [MemberName, setMemberName] = useState("");
  const [adharnumber, setadharnumber] = useState("");
  const [count, setcount] = useState(1);

  const nameOnchangeHandler = (event) => {
    setMemberName(event.target.value);
  };
  const aadharNumberOnChangeHandler = (event) => {
    setadharnumber(event.target.value);
  };
  const addmemberHandler = () => {
    setcount((prev) => {
      return prev + 1;
    });
    SetCartIsShown(true);
  };
  const handleNext = () => {
    if (TeamMember.length < 1) {
      alert("please add a member first!");
    }else if(checkduplicateArray(TeamMember)!==true){
      alert("duplicate aadhar found check the aadhar");
    } 
    else {
      console.log(props.activeStep, props.length);
      const finalstep = props.activeStep < props.length - 2 ? false : true;
      props.teamdata([TeamMember], props.activeStep + 1, finalstep, [
        aadharlist,
      ]);
    }
  };
  const adddatahandler = () => {
    if (MemberName === "" || validateAdhaar(adharnumber) === "false") {
      alert("please add correct aadhar number and  member name");
    } else {
      axios
        .post("http://localhost:4000/registration/checkaadhar", {
          eventid: props.eventid,
          aadhar_no: adharnumber,
        })
        .then((res) => {
          const newarray = aadharlist.concat({ aadhar_no: adharnumber });
          setaadharlist(newarray);
          console.log(newarray);
          const teammember = TeamMember.concat({
            name: MemberName,
            aadhar_no: adharnumber,
          });
          setTeamMember(teammember);
          SetCartIsShown(false);
        })
        .catch((err) => {
          alert("Aadhar already registered for this event");
        });
    }
  };
  function deleteMember(index) {
    var clonedTasks = [...TeamMember];

    clonedTasks.splice(index, 1);

    setTeamMember(clonedTasks);
  }
  return (
    <>
      <Card>
        {
          <Button
            variant="contained"
            color="primary"
            onClick={addmemberHandler}
            fullWidth
            disabled={count >= props.limit}
          >
            Add team Member Details
          </Button>
        }
        {cardIsShown && (
          <Modal hideCard={hideCardHandler}>
            <TextField
              id="name"
              label="Team member Name"
              variant="outlined"
              placeholder="Enter Team member Name"
              fullWidth
              margin="normal"
              onChange={nameOnchangeHandler}
            />
            <TextField
              id="adharnumber"
              label="Enter aadhar  number"
              variant="outlined"
              placeholder="Enter Team member Aadhar number"
              fullWidth
              margin="normal"
              onChange={aadharNumberOnChangeHandler}
            />
            <Button
              onClick={() => {
                SetCartIsShown(false);
              }}
            >
              back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={adddatahandler}
            >
              Next
            </Button>
          </Modal>
        )}
        {TeamMember.length > 0 && (
          <div>
            <h3>Team Members</h3>
          </div>
        )}
        {TeamMember.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 4, md: 8 }}
          >
            {TeamMember.map((member, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CardMui>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Team member
                    </Typography>
                    <Typography variant="h5" component="div">
                      {member.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Aadhar Number
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} component="div">
                      {member.aadhar_no}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        deleteMember(index);
                        setcount(count - 1);
                      }}
                    >
                      <Trash />
                    </Button>
                    <hr />
                  </CardActions>
                </CardMui>
              </Grid>
            ))}
          </Grid>
        ) : (
          <h3>No team members added yet</h3>
        )}
        <Button variant="contained" color="primary" onClick={handleNext}>
          {props.activeStep === props.length - 1 ? "Submit " : "Next"}
        </Button>
      </Card>
    </>
  );
};
const Payment = (props) => {
  const [utrnumber, setutrnumber] = useState("");
  const utrnumberHandler = (event) => {
    setutrnumber(event.target.value);
  };
  const handleNext = () => {
    if (utrnumber === "") {
      alert("enter utr number first !!");
    } else {
      console.log(props.activeStep, props.length);
      const finalstep = props.activeStep < props.length - 2 ? false : true;
      props.utr(utrnumber, props.activeStep + 1, finalstep);
    }
  };
  return (
    <>
      <CardMui sx={{ maxWidth: 345 }}>
        <CardMedia
          height={300}
          component="img"
          image={props.qr}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            fees :{props.fees}RS
          </Typography>
          <TextField
            id="Utr-number"
            label="Your UTR Number (Transaction id)"
            variant="outlined"
            placeholder="Enter your UTR Number (Transaction Id)"
            fullWidth
            margin="normal"
            value={utrnumber}
            onChange={utrnumberHandler}
          ></TextField>
        </CardContent>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {props.activeStep === props.length - 1 ? "Submit " : "Next"}
        </Button>
      </CardMui>
    </>
  );
};
const Register = () => {
  const [adharlist, setAdharlist] = useState([]);
  const [zerostep, setzerostep] = useState(false);
  const [finalstep, setfinalstep] = useState(false);
  const [firststep, setFirstStep] = useState(false);
  const [secondstep, setsecondStep] = useState(false);
  const [thirdstep, setthirdStep] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [basicregistration, setbasicRegistration] = useState(null);
  const [Teamdata, setTeamData] = useState(null);
  // const { eventid, category, maxsize } = useParams();
  const eventid = 12345;
  const category = "culural";
  const eventName = "hello";
  const date_of_registration = new Date();
  const qr =
    "https://firebasestorage.googleapis.com/v0/b/moonstone-a6c54.appspot.com/o/images%2Fgroove.jpg43521f42-055b-45ef-a405-c28a0936b867?alt=media&token=060c82d0-7fc5-4160-974f-d5d602c7167d";

  const fees = 200;
  const maxsize = 4;
  const steps = getSteps(maxsize, fees);
  const length = steps.length;
  const getbasicdataHandler = (data, activestate, finalstep) => {
    const adharnumber = data.aadhar_no;

    axios
      .post("http://localhost:4000/registration/checkaadhar", {
        eventid: eventid,
        aadhar_no: data.aadhar_no,
      })
      .then((res) => {
        const arrayname = adharlist.concat({ aadhar_no: adharnumber });
        console.log("hello", arrayname);
        setAdharlist(arrayname);
        setzerostep(true);
        setFirstStep(true);
        setbasicRegistration(data);
        setfinalstep(finalstep);
        setActiveStep(activestate);
      })
      .catch((err) => {
        alert("aadhar already registered with perticular event");
      });
  };
  const getteamdatahandler = (data, activestate, finalstep, adharlistnew) => {
    console.log(adharlistnew[0]);
    setAdharlist(adharlistnew[0]);
    setTeamData(data[0]);
    setActiveStep(activestate);
    setsecondStep(true);
    setFirstStep(false);
    setfinalstep(finalstep);
  };
  const getutrhandler = (data, activeStep, finalstep) => {
    const prevarray = basicregistration;
    const utrarray = { utr: data };
    const mergedarray = {
      ...prevarray,
      ...utrarray,
    };
    setActiveStep(activeStep);
    setbasicRegistration(mergedarray);
    console.log(mergedarray);
    setFirstStep(false);
    setsecondStep(false);
    setfinalstep(finalstep);
  };
  const FinalsubmitHandler = () => {
    const prevarray = basicregistration;
    const secondarray = {
      eventName: eventName,
      date_of_registration: date_of_registration,
      category: category,
      eventID: eventid,
    };

    const mergedata = {
      ...prevarray,
      ...secondarray,
    };

    console.log({
      email: mergedata.email,
      name: mergedata.name,
      phone_no: mergedata.phone_no,
      aadhar_no: mergedata.aadhar_no,
      utr: mergedata.utr,
      gender: mergedata.gender,
      eventName: mergedata.eventName,
      eventID: mergedata.eventID,
      college: mergedata.college,
      category: mergedata.category,
      status: "pending",
      date_of_registration: mergedata.date_of_registration,
      team: [...Teamdata],
      aaharlist: [...adharlist],
    });
    axios
      .post("http://localhost:4000/registration/register", {
        email: mergedata.email,
        name: mergedata.name,
        phone_no: mergedata.phone_no,
        aadhar_no: mergedata.aadhar_no,
        utr: mergedata.utr,
        gender: mergedata.gender,
        eventName: mergedata.eventName,
        eventID: mergedata.eventID,
        college: mergedata.college,
        category: mergedata.category,
        status: "pending",
        date_of_registration: mergedata.date_of_registration,
        team: [...Teamdata],
        aaharlist: [...adharlist],
      })
      .then((res) => {
        console.log("success");
        alert("registration done successfully!!");
      })
      .catch((err) => {
        alert("unable to register ! try again");
      });
  };
  return (
    <>
      <div className={styles.registerpage}>
        <Card>
          <img src={image} className={styles.myelement} />
          <h4
            style={{
              alignItems: "center",
              textAlign: "center",
              color: "brown",
              fontWeight: "bold",
              fontSize: "30px",
              margin: 0,
            }}
            className={styles.fonts}
          >
            Register
          </h4>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              const stepProps = {};
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {!zerostep && (
            <BasicDetails
              activeStep={activeStep}
              nextstep={getbasicdataHandler}
              length={length}
            />
          )}
          {firststep && maxsize > 1 && (
            <TeamDetails
              limit={maxsize}
              teamdata={getteamdatahandler}
              activeStep={activeStep}
              length={length}
              eventid={eventid}
              adharno={adharlist}
            />
          )}

          {secondstep && fees > 0 && (
            <Payment
              qr={qr}
              fees={fees}
              activeStep={activeStep}
              length={length}
              utr={getutrhandler}
            />
          )}
          {firststep && maxsize === 1 && fees > 0 && (
            <Payment
              qr={qr}
              fees={fees}
              activeStep={activeStep}
              length={length}
              utr={getutrhandler}
            />
          )}

          {finalstep && (
            <div>
              <h3>Thanks for Registration!! please click on Final Submit</h3>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={FinalsubmitHandler}
              >
                {" "}
                Final submit
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default Register;
