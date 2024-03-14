const {user}=require('../models');

module.exports.home = (req, res) => {

    try {
    res.render("home");
      
    } catch (error) {
      console.log(error);
    }
   
  }


  module.exports.students = async(req, res) => {

    try {
      const students=await user.findAll();
      let users=[];
    
      students.forEach(user => {
           users.push(user.dataValues);
      });
   
    res.render("students",{users});
  }
  catch (error) {
      console.log(error);
    }
   
  }

  module.exports.updates = async(req, res) => {

    try {
    

    res.render("updates");
      
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.updateStudent = async(req, res) => {

    try {
    const studentID=req.body.studentID;
    const student=await user.findOne({where: {studentID}});
    if(!student)res.send("Student not found")
    var subjectArray = JSON.parse(student.dataValues.subjectsList);
    var marksList=(await user.findOne({where: {studentID}})).dataValues.subjectsMarks;
    var flag=false;
    if(marksList)
    {
      flag=true;
    var marksList = JSON.parse(marksList);
    }
    

    res.render("addMarks",{subjectArray,studentID,flag,marksList});
      
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.add = async(req, res) => {

    try {
      const fName=req.body.firstName;
      const lName=req.body.lastName;
      const age=req.body.age;
      const dob=req.body.DOB;
      const className=req.body.class;
      var subjectsList=req.body.SubjectList;
      var subjectArray = subjectsList.split('\n');
      for(let i=0; i<subjectArray.length; i++) {
        subjectArray[i]=subjectArray[i].trim();
      }
      
  
      console.log(subjectArray);
      var subjectsList = JSON.stringify(subjectArray);

      const studentName=fName.trim()+" "+lName.trim();
      const subjectsMarks="";
      const subjectsGrade="";
      const subjectsPer="";

      await user.create({studentName,age,dob,className,subjectsList,subjectsMarks,subjectsGrade,subjectsPer});
      res.redirect("/students");
      
    } catch (error) {
      console.log(error);
    }
   
  }
  function getGrade(per)
  {
    if(per>90)return "A+";
    else if(per>=80) return "A";  
    else if(per>=70) return "B";
    else if(per>=60) return "C";
    else if(per>=50) return "D"; 
    return "F";
  }
  module.exports.updateStudentMarks = async(req, res) => {

    try {
      const studentID=req.body.studentID;
      const student=await user.findOne({where: {studentID}});
      var subjectArray = JSON.parse(student.dataValues.subjectsList);
      const reqOb=req.body;
      const marksList=[];
      const perList=[];
      const gradeList=[];
      var count=0;
      var sum=0;

      subjectArray.forEach((subject)=>{
        marksList.push([reqOb[subject+'ob'],reqOb[subject+'fm']]);
        const per = ((reqOb[subject + 'ob'] / reqOb[subject + 'fm']) * 100).toFixed(2);
        sum+=parseInt(per);
        count++;
        perList.push(per);
        gradeList.push(getGrade(per));
      })
      const subjectsMarks=JSON.stringify(marksList);
      const subjectsGrade=JSON.stringify(gradeList);
      const subjectsPer=JSON.stringify(perList);
      console.log(sum);
      console.log(count);
      const overallPer=(sum/count).toFixed(2);
      const overallGrade=getGrade(overallPer);
      await user.update(
        { 
          subjectsMarks,
          subjectsGrade,
          subjectsPer,
          overallPer,
          overallGrade
        },
        { 
          where: { studentID }
        }
      );
      res.redirect('/students');
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.deleteStudent = async(req, res) => {
  try {
    res.render("deleteStudent");
  } catch (error) {
    console.log(error);
  }
  }

  module.exports.deleteStudentRecord = async(req, res) => {
    try {
      const studentID =req.body.studentID;
      await user.destroy({where: {studentID}});
      res.redirect("/students");
    } catch (error) {
      console.log(error);
    }
    }
    module.exports.search = async(req, res) => {
      try {
        res.render("search");
      } catch (error) {
        console.log(error);
      }
      }

    module.exports.searchStudent = async(req, res) => {
        try {
          search={};
          const studentID=req.body.studentID;
          const name=req.body.name;
          const age=req.body.age;
          const dob=req.body.dob;
          const className=req.body.className;

          if(studentID)search['studentID'] = studentID;
          if(name)search['studentName'] = name;
          if(age)search['age'] = age;
          if(dob)search['dob'] = dob;
          if(className)search['className'] = className;
          console.log(search);
          let users=[];
    
          const students=await user.findAll({where:search});
          students.forEach(user => {
           users.push(user.dataValues);
       });
       res.render("students",{users});

        } catch (error) {
          console.log(error);
        }
        }
        module.exports.filter = async(req, res) => {
          try {
            res.render("filter");
          } catch (error) {
            console.log(error);
          }
          }
          module.exports.filterStudent = async(req, res) => {
            try {
              const grade=req.body.grade;
              const perMx=req.body.perMx;
              const perMn=req.body.perMn;
              var flag=false;
              if(perMx && perMn) flag=true;

              const students = await user.findAll();
              var users=[];
              students.forEach(student => {
                if(flag &&student.dataValues.overallPer<=perMx && student.dataValues.overallPer>=perMn )users.push(student.dataValues);
                if(student.dataValues.overallGrade === grade)users.push(student.dataValues);
              })

              res.render("students",{users});
            } catch (error) {
              console.log(error);
            }
            }

            module.exports.bonus = async(req, res) => {
              try {
                res.render("bonus");
              } catch (error) {
                console.log(error);
              }
              }
              module.exports.avgClass = async(req, res) => {
                try {
                  className=req.body.className;
                  const students = await user.findAll();
                  var sum=0;
                  var count=0;
              students.forEach(student => {
                if(student.dataValues.className === className)
                {
                  sum=+parseFloat(student.dataValues.overallPer);
                  count++;
                }
              })
              const avg=(sum/count).toFixed(2);
              res.send(avg); 
                } catch (error) {
                  console.log(error);
                }
                }
                module.exports.avgMarks = async(req, res) => {
                  try {
                    studentID=req.body.studentID;
                    const students = await user.findOne({where:{studentID}});

                    var sumO=0;
                    var sumF=0;
                    var count=0;
                    const marksList=JSON.parse(students.dataValues.subjectsMarks)
                    marksList.forEach(mark => {
                      count++;
                      sumO+=parseFloat(mark[0]);
                      sumF+=parseFloat(mark[1]);
                })
                const avgO=(sumO/count).toFixed(2);
                const avgF=(sumF/count).toFixed(2);

                res.send({
                  "Obtained Average Marks": avgO,
                  "Full Average Marks": avgF
                }); 
                  } catch (error) {
                    console.log(error);
                  }
                  }