using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ECommerceAPI.Persistence.Contexts
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ECommerceAPIDbContext>
    {
        public ECommerceAPIDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ECommerceAPIDbContext>();
            // Burada bağlantı dizesi verilmez, çünkü ECommerceAPIDbContext içinde ayarlandı
            return new ECommerceAPIDbContext(optionsBuilder.Options);
        }
    }
}
