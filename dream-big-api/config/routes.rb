Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
# root "articles#index"
mount DreamBigApi => '/'
resources :users, param: :_username
post '/auth/login', to: 'authentication#login' 
get '/*a', to: 'application#not_found'

mount GrapeSwaggerRails::Engine => '/api/docs'
end
