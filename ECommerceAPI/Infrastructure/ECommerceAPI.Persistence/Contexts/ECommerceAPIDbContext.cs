using ECommerceAPI.Domain.Entities;
using ECommerceAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Persistence.Contexts
{
    public class ECommerceAPIDbContext : DbContext
    {
        public ECommerceAPIDbContext(DbContextOptions<ECommerceAPIDbContext> options) : base(options) 
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=ECommerceDB;User Id=postgres;Password=2508;");
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }

        // Interceptor
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas)
            {
                switch (data.State)
                {
                    case EntityState.Added:
                        data.Entity.CreateDate = DateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                        data.Entity.UpdateDate = DateTime.UtcNow;
                        break;
                    case EntityState.Deleted:
                        // Opsiyonel: Silinen bir entity için özel bir işlem yapılabilir.
                        break;
                    case EntityState.Unchanged:
                        // Değişiklik yoksa bir işlem yapılmaz.
                        break;
                    default:
                        throw new ArgumentOutOfRangeException(); // Bilinmeyen durumlar için bir hata fırlat.
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
