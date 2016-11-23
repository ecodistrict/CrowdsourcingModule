Rails.application.routes.draw do
  mount Demando::Engine => '/demando'

  root 'site#index'
end
