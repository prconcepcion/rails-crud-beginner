Rails.application.routes.draw do
    scope "/api" do
        resources :employees, controller: "employees"
        get :companies, to: "companies#index"
        get :projects, to: "projects#index"
    end
end
