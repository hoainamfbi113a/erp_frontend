import { Steps } from "antd";
import Notify from "components/Modal/Notify";
import React from "react";
import { useRouteMatch } from "react-router-dom";
const { Step } = Steps;

const Index = ({
  activeLink,
  setActiveLink,
  modalNotify,
  profile,
  renderMenuLeft,
  renderWorkflow,
  handleReject,
  handleConfirm,
  handleReloadComponent,
  value,
  setModalNotify,
}) => {
  const router = useRouteMatch();

  return (
    <div className="content-background2" style={{ width: "100%" }}>
      <Steps current={value} size="small" className="process-work-flow">
        {renderWorkflow()}
        <Step title="Hồ sơ sẵn sàng" />
      </Steps>
      {value == 2 ? (
        <li className="tabs-main-left-li btn-confirm-reject ">
          <span
            onClick={handleReject}
            className="btn-confirm btn-add-user"
            style={{ marginBottom: "10px", width: "140px" }}
          >
            Không duyệt
          </span>
          <span
            onClick={handleConfirm}
            className="btn-no-confirm btn-add-user"
            style={{ marginBottom: "10px", width: "140px" }}
          >
            Duyệt
          </span>
        </li>
      ) : (
        ""
      )}
      <div style={{ minHeight: "70vh" }} className="edit-infor">
        <div className="edit-infor-tabs">
          {router.path === "/profile-service/profile/create" ? (
            <ul>
              <li>
                <div className={activeLink === 1 ? "active" : ""}>1</div>
                <span className={activeLink === 1 ? "active" : ""}>
                  Sơ yếu lý lịch
                </span>
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={() => setActiveLink(1)}>
                <div className={activeLink === 1 ? "active" : ""}>1</div>
                <span className={activeLink === 1 ? "active" : ""}>
                  Sơ yếu lý lịch
                </span>
              </li>
              <li onClick={() => setActiveLink(2)}>
                <div className={activeLink === 2 ? "active" : ""}>2</div>
                <span className={activeLink === 2 ? "active" : ""}>
                  Lịch sử bản thân
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveLink(3);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={activeLink === 3 ? "active" : ""}>3</div>
                <span className={activeLink === 3 ? "active" : ""}>
                  Gia nhập Đảng Cộng Sản Việt Nam
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveLink(4);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={activeLink === 4 ? "active" : ""}>4</div>
                <span className={activeLink === 4 ? "active" : ""}>
                  Tham gia các tổ chức chính trị, xã hội, các hội nghề nghiệp
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveLink(5);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={activeLink === 5 ? "active" : ""}>5</div>
                <span className={activeLink === 5 ? "active" : ""}>
                  Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị
                  ngoại ngữ
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveLink(6);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={activeLink === 6 ? "active" : ""}>6</div>
                <span className={activeLink === 6 ? "active" : ""}>
                  Khen thưởng, kỷ luật
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveLink(7);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={activeLink === 7 ? "active" : ""}>7</div>
                <span className={activeLink === 7 ? "active" : ""}>
                  Quan hệ gia đình thân tộc
                </span>
              </li>
            </ul>
          )}

          <div className="edit-infr-vertical-line"></div>
        </div>
        {/* <div className="edit-infor-form edit-infor-form-DCS"> */}
        {renderMenuLeft()}
        {/* </div> */}
      </div>
      <Notify
        actionModal={modalNotify}
        pro_id={profile.id}
        closeDeny={() => {
          setModalNotify(false);
        }}
        handleReloadComponent={() => handleReloadComponent}
      />
    </div>
  );
};
export default Index;
