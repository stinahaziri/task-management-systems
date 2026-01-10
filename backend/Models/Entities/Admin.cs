namespace backend.Models.Entities
{
    public class Admin
    {
        public int Id { get; set; }                    
        public string Username { get; set; }=string.Empty;          
        public string Email { get; set; }=string.Empty;         
        public string PasswordHash { get; set; }=string.Empty;       
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } =DateTime.Now;
    }
}