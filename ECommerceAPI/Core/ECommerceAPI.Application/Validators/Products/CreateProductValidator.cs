
using ECommerceAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ECommerceAPI.Application.Validators.Products{

    public class CreateProductValidator : AbstractValidator<VM_Create_Product> {

        public CreateProductValidator(){
            RuleFor(p => p.Name).NotEmpty().NotNull().WithMessage("Please fill the blank").MaximumLength(150).MinimumLength(5).WithMessage("Please enter the product name between 5 and 150 words.");
            RuleFor(p => p.Stock).NotEmpty().NotNull().WithMessage("Please fill the blank").Must(s => s >= 0).WithMessage("stock information cannot be less than 0");
            RuleFor(p => p.Price).NotEmpty().NotNull().WithMessage("Please fill the blank").Must(s => s >= 0).WithMessage("price information cannot be less than 0");
        }

    }
}