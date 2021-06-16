import React, { Component } from "react";
import CurriculumVitae from "./CurriculumVitae";
const CurriculumVitaeContainer = () => {
  const functionSearch = () => {};
  const formatDate = () => {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + "/" + month + "/" + year;
  };
  const handleSave = () => {
    this.onAddInforUser("save");
  };
  const handleSend = () => {
    this.onAddInforUser("send");
  };
    const onChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        this.setState({ [name]: value }, () => {
          this.handleInputValid(name, value);
        });
      };
    const onChangeSex = (e) => {
        this.setState({
          pro_gender: e.target.value,
        });
      };
    const onChangeBirthDay = (e, dateString, name) => {
        this.setState({
          [name]: dateString,
        });
      };
    const onChangeRange = (e, dateString, name1, name2) => {
        this.setState({
          [name1]: dateString[0],
          [name2]: dateString[1],
        });
      };
    const componentDidMount = async () => {
        this.fetchData();
        this.fetChImg();
      };
    const fetchData = async () => {
        this.props.uiActionCreatorsS();
        await this.fetchDataUser();
        this.props.uiActionCreatorsH();
      };
      const handleSearchDepartment(value) {
        if (this.typingRef.current) {
          clearTimeout(this.typingRef.current);
        }
        this.typingRef.current = setTimeout(() => {
          this.setState({
            searchDepartment: value,
          });
        }, 500);
      }
     const handleSearchPosition(value) {
        if (this.typingRef.current) {
          clearTimeout(this.typingRef.current);
        }
        this.typingRef.current = setTimeout(() => {
          this.setState({
            searchPosition: value,
          });
        }, 500);
      }
      const handleSearchPart(value) {
        if (this.typingRef.current) {
          clearTimeout(this.typingRef.current);
        }
        this.typingRef.current = setTimeout(() => {
          this.setState({
            searchPart: value,
          });
        }, 500);
      }
      const handFocusDepartment = () => {
        this.setState({
          dep_id: null,
          par_id: null,
        });
      };
      const handFocusPart = () => {
        this.setState({
          par_id: null,
        });
      };
      const handFocusPosition = () => {
        this.setState({
          pos_id: null,
        });
      };
      const handleInputValid = (name, value) => {
        const { isValid, errorMessage } = validateInputFormUser(name, value);
        this.setState({
          [`valid_${name}`]: {
            isValid: isValid,
            errorMessage: errorMessage,
          },
        });
      };
  };
  return <CurriculumVitae />;
};