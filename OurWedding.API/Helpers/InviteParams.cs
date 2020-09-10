namespace OurWedding.API.Helpers
{
    public class InviteParams
    {
        private const int MaxPageSize = 300;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 200;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string Status { get; set; }
        public string OrderBy { get; set; }
        public bool IsBlacklisted { get; set; }
    }
}