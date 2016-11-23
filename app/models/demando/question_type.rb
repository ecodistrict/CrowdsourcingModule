module Demando
  class QuestionType < ActiveRecord::Base
    include Demando::Concerns::Models::QuestionType

    ECODISTRICT_BUILDING_SELECTOR = 9999
  end
end
