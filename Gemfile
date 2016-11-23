source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.6'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# For consuming restful web services
gem 'httparty'

# Use mysql as the database for Active Record
gem 'mysql2'

group :production do
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'execjs'

  # Call JavaScript code and manipulate JavaScript objects from Ruby. Call Ruby code and manipulate Ruby objects from JavaScript.
  gem 'therubyracer'

  # Use Uglifier as compressor for JavaScript assets
  gem 'uglifier', '>= 1.3.0'
end

# Use the Demando questionnaire gem
if ENV["RAILS_ENV"] == "production"
  gem 'demando', path: '/var/www/demando-plugin/0.0.16'
else
  gem 'demando', path: 'D:\source\DemandoPlugin'
end

source 'http://rails-assets.org' do
  gem 'rails-assets-leaflet'
end