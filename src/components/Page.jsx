import { Table } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri"; //delete icon
import { AiOutlineLogout } from "react-icons/ai"; //logout icon
import { BsFillArrowLeftCircleFill } from "react-icons/bs"; //logout icon
import { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataAll, setDataAll] = useState([]);
  const [laoding, setLaoding] = useState(true);
  const [error, setError] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [dateStart, setDateStart] = useState("");
  let date = `${new Date().getFullYear() + 50}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const [dateEnd, setDateEnd] = useState(date);
  const refIdItem = useRef();


  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://altarefi.icrcompany.net/api/forms?${
          dateStart ? `start_date=${dateStart} 00:00:00` : ""
        }&end_date=${dateEnd} 00:00:00`
      )
      .then((response) => {
        if (response) {
          setDataAll(response.data.data.data);
          setLaoding(false);
          setError("");
          setShowDate(!dateEnd || !dateStart ? true : false);
          setPageCount(
            Math.ceil(response.data.data.total / response.data.data.per_page)
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLaoding(false);
        setError("No internet connection");
      });
  }, [dateStart, dateEnd]);
  const handlePageClick = (event) => {
    axios
      .get(
        `https://altarefi.icrcompany.net/api/forms?page=${event.selected + 1}`
      )
      .then((res) => {
        setDataAll(res.data.data.data);
        console.log(res.data);
        return res.data;
      });
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // setItemOffset(newOffset);
  };

  // delete item
  const deleteItem = async (e) => {
    setShowDelete(true);
    refIdItem.current = e.id;
  };
  const sureDeleteItem = () => {
    try {
      setDataAll(dataAll.filter((p) => p.id !== refIdItem.current));
      axios.delete(
        `https://altarefi.icrcompany.net/api/forms/${refIdItem.current}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  // delete All item
  const deleteItemAll = () => {
    try {
      setDataAll(axios.delete(`https://altarefi.icrcompany.net/api/forms`));
    } catch (e) {
      console.log(e);
    }
  };

  const Laoding = () => {
    return (
      <tr>
        <td colSpan="5" style={{ borderRight: "none", fontSize: "23px" }}>
          <h1 className="text-center">Laoding...</h1>
        </td>
      </tr>
    );
  };
  // -----------------------------------------------------------------------------
  const [dataWin, setDataWin] = useState([]);
  const [winnerName, setWinnerName] = useState("");
  const [pop, setPop] = useState(false);
  const [popTwo, setPopTwo] = useState(false);
  const [startWin, setStartWin] = useState("");
  const [endWin, setEndWin] = useState("");
  const [page, setPage] = useState(sessionStorage.getItem("page") || false);
  const [pageCountwin, setPageCountwin] = useState(1);

  useEffect(() => {
    axios
      .get("https://altarefi.icrcompany.net/api/winners")
      .then((re) => {
        setDataWin(re.data.data.data);
        setPageCountwin(Math.ceil(re.data.data.total / re.data.data.per_page));
      })
      .catch((e) => console.log(e));
  }, [page]);
  const winner = () => {
    // اختيار فائز جديد
    axios
      .get(
        `https://altarefi.icrcompany.net/api/winner?start_date=${startWin} 00:00:00&end_date=${endWin} 00:00:00`
      )
      .then((res) => {
        setWinnerName(res.data.name);
        console.log(res.data.name);
      })
      .catch((err) => {
        console.log(err);
        setWinnerName("error");
      });
  };
  const handlePageClickWin = (event) => {
    //Paginate
    axios
      .get(
        `https://altarefi.icrcompany.net/api/winners?page=${event.selected + 1}`
      )
      .then((res) => {
        setDataWin(res.data.data.data);
        return res.data;
      });
  };

  const deleteWinnerItem = async (e) => {
    try {
      setDataWin(dataWin.filter((p) => p.id !== e.id));
      axios.delete(`https://altarefi.icrcompany.net/api/winners/${e.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className={`dark  ${open ? "" : "d-none"} `}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={`container page  flex-column w-100 h-100 ${
          page ? "d-none" : "d-flex"
        }`}
      >
        <div className="py-2">
          <img src="./logo.png" alt="" />
        </div>
        <div className="btn-fllter d-lg-flex d-block">
          <div className="position-relative">
            <span>Start Date</span>
            {/* type="datetime-local" */}
            <input type="date" onChange={(e) => setDateStart(e.target.value)} />
          </div>
          <div className="position-relative">
            <span>End Date</span>
            <input type="date" onChange={(e) => setDateEnd(e.target.value)} />
          </div>
        </div>
        <div className="w-100 oo">
          <Table className=" text-center tt m-auto">
            <thead>
              <tr>
                <th> Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {laoding ? (
                <Laoding />
              ) : dataAll.length <= 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ borderRight: "none", fontSize: "23px" }}
                  >
                    There is no data to display
                  </td>
                </tr>
              ) : (
                dataAll.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.phone_number}</td>
                    <td>{e.address ? e.address : "__"}</td>
                    <td>{e.created_at}</td>
                    <td>
                      {e.name ? (
                        <img
                          src="./delete.png"
                          alt=""
                          width={25}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteItem(e);
                          }}
                        />
                      ) : (
                        <div className="p-3"></div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <h1 className="d-flex m-auto"> {error ? error : null}</h1>
        <ReactPaginate
          className="pagination"
          previousLabel=""
          nextLabel=""
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
        />
      </div>
      <div
        className={`container page  flex-column w-100 h-100 ${
          page ? "d-flex" : "d-none"
        }`}
      >
        <div className="py-2">
          <img src="./logo.png" alt="" />
        </div>
        <span
          className=" fs-1 m-3 text-light"
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            width: " 100%",
          }}
          onClick={() => {
            setPage(false);
            window.sessionStorage.removeItem("page");
          }}
        >
          <BsFillArrowLeftCircleFill color="#762a8d" />
        </span>
        <div
          className="d-flex justify-content-center align-items-center fs-1 m-3 text-light"
          style={{
            cursor: "pointer",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "var(--linear-gr)",
          }}
          onClick={() => setPop(true)}
        >
          +
        </div>
        <div className="w-100 oo">
          <Table className=" text-center tt m-auto">
            <thead>
              <tr>
                <th>Winner's name</th>
                <th>Number</th>
                <th>Address</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataWin.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.phone_number}</td>
                  <td>{e.address}</td>
                  <td>{e.created_at}</td>
                  <td>
                    {" "}
                    <img
                      src="./delete.png"
                      alt=""
                      width={25}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteWinnerItem(e);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <h1 className="d-flex m-auto"> {error ? error : null}</h1>
        <ReactPaginate
          className="pagination"
          previousLabel=""
          nextLabel=""
          breakLabel="..."
          pageCount={pageCountwin}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClickWin}
          pageClassName="page-item"
          pageLinkClassName="page-link"
        />
      </div>
      <div className={`messge ${pop ? "d-block" : "d-none"}`}>
        <div className={`pop`}>
          <div className="btn-fllter d-flex align-items-center justify-content-center flex-column">
            <div className="xx" onClick={() => setPop(false)}>
              X
            </div>
            <div className="position-relative">
              <span>Start Date</span>
              <input
                type="date"
                onChange={(e) => setStartWin(e.target.value)}
              />
            </div>
            <div className="position-relative">
              <span>End Date</span>
              <input type="date" onChange={(e) => setEndWin(e.target.value)} />
            </div>
            <div className="position-relative ">
              <button
                type="submit"
                className="button w-100 text-light px-5"
                onClick={() => {
                  winner();
                  setPop(false);
                  setPopTwo(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`messge ${popTwo ? "d-block" : "d-none"} text-center`}>
        <div className={`pop`}>
          <h3>the winner is</h3>
          <h1 style={{ color: "#0a7644" }}>{winnerName}</h1>
          <button
            className="button w-50 text-light"
            onClick={() => setPopTwo(false)}
          >
            OK
          </button>
        </div>
      </div>
      {/* ----------------------------------------------------- */}
      <div>
        <div className={`Off-canvas ${open ? "open" : ""}`}>
          <div className="sett" onClick={() => setOpen(!open)}>
            {">"}
            <img src="./Rectangle.png" alt="" />
          </div>
          <div className="h-logo">
            <img src="./logo.png" alt="" />
          </div>
          <div className="body-p">
            <ul>
              <h5 className={`${showDate ? "" : "d-none"} text-danger`}>
                Enter the start and end dates
              </h5>
              <li>
                <a
                  onClick={() =>
                    setShowDate(!dateEnd || !dateStart ? true : false)
                  }
                  href={
                    dateEnd && dateStart
                      ? `https://altarefi.icrcompany.net/export/excel?end_date=${dateEnd}%00:00:00&start_date=${dateStart}%00:00:00`
                      : "#"
                  }
                >
                  Export Excel
                </a>
              </li>
              <li
                onClick={() =>
                  setShowDate(!dateEnd || !dateStart ? true : false)
                }
              >
                <a
                  href={
                    dateEnd && dateStart
                      ? `https://altarefi.icrcompany.net/export/pdf?end_date=${dateEnd}%00:00:00&start_date=${dateStart}%00:00:00`
                      : "#"
                  }
                >
                  Export PDF
                </a>
              </li>
              <li
                onClick={() => {
                  setPage(true);
                  window.sessionStorage.setItem("page", true);
                }}
              >
                <a href="##">Winners</a>{" "}
              </li>
              <li>
                <Link to={"/changepassword"}>Change Password</Link>
              </li>
            </ul>
            <div
              onClick={() => {
                setShowDeleteAll(true);
              }}
            >
              <RiDeleteBin5Line
                size={25}
                color="rgba(241, 49, 49, 0.938)"
                className="mx-2"
              />
              <span>Delete All</span>
            </div>
            <div>
              <Link
                to={"/login"}
                onClick={() => {
                  window.localStorage.removeItem("token");
                }}
              >
                <AiOutlineLogout size={25} color="#9d3cb3" className="mx-2" />
                <span>Log Out</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      <div className={`messge ${showDeleteAll ? "" : "d-none"} text-center`}>
        <div>
          <h5>
            Are you sure you want to permanently delete all of these items?
          </h5>
          <div>
            <button
              onClick={() => {
                deleteItemAll();
                setShowDeleteAll(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowDeleteAll(false)}>No</button>
          </div>
        </div>
      </div>
      <div className={`messge ${showDelete ? "" : "d-none"}`}>
        <div>
          <h5>Are you sure to delete this item?</h5>
          <div>
            <button
              onClick={() => {
                sureDeleteItem();
                setShowDelete(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowDelete(false)}>No</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
