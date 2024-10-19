const Reservation = ({handleSearch,flights,searchParams,setSearchParams,handleSelectFlight,handleSaveBooking,view, handleModifyBooking,handleCancelBooking,passengers,setPassengers,bookingId,setBookingId,fetchBookingDetails,setView}) => {

  const renderView = () => {
    switch (view) {
      case 'search':
        return (
          <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Asal"
            value={searchParams.origin}
            onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Tujuan"
            value={searchParams.destination}
            onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Cari Penerbangan</button>
        </form>
        );
      case 'select':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Pilih Penerbangan</h2>
            {
              flights?.length > 0 ? (
                <>
                  {flights?.map(flight => (
              <div key={flight.flight_id} className="mb-4 p-4 border rounded">
                <p>Nomor Penerbangan: {flight.flight_number}</p>
                <p>Dari: {flight.origin} - Ke: {flight.destination}</p>
                <p>Berangkat: {new Date(flight.departure_time).toLocaleString()}</p>
                <p>Harga: Rp {flight.price.toLocaleString()}</p>
                <button 
                  onClick={() => handleSelectFlight(flight)}
                  className="mt-2 p-2 bg-green-500 text-white rounded w-full"
                >
                  Pilih
                </button>
              </div>
            ))}
                </>
              ) : (
                <div>
                  <h1>maaf, Data tidak ada silahkan cari sesuai rute</h1>
                  <button onClick={() => setView('search')} className="bg-red-500 rounded-lg p-2 text-white mt-4">Back</button>
                </div>

              )
            }
          
          </div>
        );
      case 'book':
        return (
          <form onSubmit={handleSaveBooking} className="space-y-4">
            <h2 className="text-xl font-bold">Input Data Penumpang</h2>
            {passengers.map((passenger, index) =>{
              return  (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nama Depan"
                    value={passenger.first_name}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      newPassengers[index].first_name = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nama Belakang"
                    value={passenger.last_name}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      newPassengers[index].last_name = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={passenger.email}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      newPassengers[index].email = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Nomor Telepon"
                    value={passenger.phone_number}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      newPassengers[index].phone_number = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )
            })}
            <button 
              type="button" 
              onClick={() => setPassengers([...passengers, { firstName: '', lastName: '', email: '', phoneNumber: '' }])}
              className="w-full p-2 bg-gray-500 text-white rounded"
            >
              Tambah Penumpang
            </button>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Simpan Pemesanan</button>
          </form>
        );
      case 'modify':
        return (
          <form onSubmit={handleModifyBooking} className="space-y-4">
            <h2 className="text-xl font-bold">Ubah Detail Pemesanan</h2>
            {passengers.map((passenger, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Nama Depan"
                  value={passenger.first_name}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].first_name = e.target.value;
                    setPassengers(newPassengers);
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Nama Belakang"
                  value={passenger.last_name}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].last_name = e.target.value;
                    setPassengers(newPassengers);
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={passenger.email}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].email = e.target.value;
                    setPassengers(newPassengers);
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Nomor Telepon"
                  value={passenger.phone_number}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].phone_number = e.target.value;
                    setPassengers(newPassengers);
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Perbarui Pemesanan</button>
            <button 
              type="button" 
              onClick={handleCancelBooking}
              className="w-full p-2 bg-red-500 text-white rounded"
            >
              Batalkan Pemesanan
            </button>
          </form>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Pemesanan Tiket Pesawat</h1>
      {view === 'search' && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Masukkan ID Pemesanan"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={fetchBookingDetails}
            className="mt-2 w-full p-2 bg-green-500 text-white rounded"
          >
            Cari Pemesanan
          </button>
        </div>
      )}
      {renderView()}
    </div>
  );
}

export default Reservation