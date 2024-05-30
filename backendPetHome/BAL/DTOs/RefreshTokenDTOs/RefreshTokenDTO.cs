namespace backendPetHome.BLL.DTOs.RefreshTokenDTOs
{
    public class RefreshTokenDTO
    {
        public DateTime expires { get; set; } = DateTime.Now.AddDays(7);
        public string token { get; set; } = string.Empty;
        public string ownerId { get; set; }
    }
}
