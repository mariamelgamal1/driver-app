import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const tableStyle = {
  width: '80%', // Adjust width
  margin: '0 auto', // Center the table
};

function DriverTable({ drivers }) {
 
  return (
    <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>#id</th>
          <th>Driver Name</th>
          <th>National ID</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Status</th>
          <th>License Type</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.id}>
            <td>{driver.id}</td>
            <td>{driver.attributes.name || 'N/A'}</td>
            <td>{driver.attributes.nationalId || 'N/A'}</td>
            <td>{driver.attributes.phoneNumber || 'N/A'}</td>
            <td>{driver.attributes.email || 'N/A'}</td>
            <td>{driver.attributes.status || 'N/A'}</td>
            <td>{driver.attributes.licenseType || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

DriverTable.propTypes = {
  drivers: PropTypes.array.isRequired
};

export default DriverTable;
