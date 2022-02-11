import { Link } from "react-router-dom";

export const Columns = [
    {
        Header : 'Time',
        accessor : 'Time'
    },
    {
        Header : 'Date',
        accessor :'Date'
    },
    {
        width : 100,
        Header : 'Team A',
        accessor :'Team1'
    },
    {
        Header : 'Team B',
        accessor :'Team2'
    },
    {
        Header : 'Score A',
        accessor :'score1'
    },
    {
        Header : 'Score B',
        accessor :'score2'
    },

   {
        Header : 'Arena',
        accessor :'Arena'
    },
  
    {
        Header : '',
        accessor :'namedf',
        Cell: cell => (
              <Link to="/ticket"><button>Tickets</button></Link>
          )
    },
     {
        Header: "",
        accessor : "isdfd",
        Cell: cell => (
          <button value="watch">
            Watch
          </button>
        )
    },
]

export default Columns;