module Demando
  class Questionnaire < ActiveRecord::Base
    include Demando::Concerns::Models::Questionnaire

    # Returns an array with all answers of the questionnaire.
    def answers_to_array
      answer_records = super

      questions.each do |question|
        question.answers.each do |answer|
          answer_records.each do |answer_record|
            answer_record[:ecodistrict_case_id] = ecodistrict_case_id
            answer_record[:ecodistrict_variant_id] = ecodistrict_variant_id
            if answer_record[:question_id] == question.id
              answer_record[:ecodistrict_property_name] = question.ecodistrict_property_name
            end
          end
        end
      end

      answer_records
    end
  end
end