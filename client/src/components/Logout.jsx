import Button from 'react-bootstrap/Button';
import axios from 'axios';


  

  const Logout = () => {
    const handleLogout = async () => {
        try {
          // Wysyłamy żądanie do endpointu /logout na serwerze
          const response = await axios.get('http://localhost:3000/logout');
          alert("Logout successful")
          // Sprawdzamy, czy żądanie zakończyło się sukcesem
          if (response.status === 200) {
            // Usuwamy ciasteczko z przeglądarki (opcjonalnie)
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
            // Dodatkowe akcje po wylogowaniu
            console.log(response.data.message);
          } else {
            // Obsługujemy błąd z serwera
            console.error(`Błąd: ${response.status}`);
          }
        } catch (error) {
          // Obsługujemy błąd zapytania
          console.error(`Błąd: ${error.message}`);
        }
      };
    return (
      <Button style={{width: '100px', marginLeft: '50px'}} type='submit' onClick={handleLogout} variant="danger">Logout</Button>
  
    );
  }

export default Logout
  