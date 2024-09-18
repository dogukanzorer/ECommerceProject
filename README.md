   # projeyi Run Etme
   # ./run.sh
   
   
     ECommerce Project
  # Backend (C# .NET API)
    cd Backend/Presentation/ECommerce.API/API
    dotnet restore
    dotnet run
     
 # Frontend (Angular)
   cd AngularUI
   npm install
   ng serve

# ECommerceProject

○     Backend(C#)    ○
  Tracing Mechanism
  Interceptor
  CORS Policies
  HTTP Client Service Customisation
  Validation Rules

 ○ Frontend(Angular) ○
     Toastr
     Alertify
     Spinner
   


                                                     ○   Backend Validations Rule  ○ 
   Product:                             
   RuleFor(p => p.Name).NotEmpty().NotNull().WithMessage("Please fill the blank").MaximumLength(150).MinimumLength(5).WithMessage("product name between 5 and 150 words.");
   RuleFor(p => p.Stock).NotEmpty().NotNull().WithMessage("Please fill the blank").Must(s => s >= 0).WithMessage("stock information cannot be less than 0");
   RuleFor(p => p.Price).NotEmpty().NotNull().WithMessage("Please fill the blank").Must(s => s >= 0).WithMessage("price information cannot be less than 0");...

   