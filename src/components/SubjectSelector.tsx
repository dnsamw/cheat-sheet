import React, { useState, useEffect, useRef } from 'react';
import '../assets/scss/subject-selector.scss';
import { LuX } from "react-icons/lu";

export interface Subject {
  id: string;
  name: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  onChange: (selectedSubjects: Subject[]) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredSubjects(subjects);
  }, [subjects]);

  // useEffect(() => {
  //   console.log("filtered ", filteredSubjects);
    
  // }, [onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const handleSubjectSelect = (subject: Subject) => {
    if (!selectedSubjects.some(s => s.id === subject.id)) {
      setSelectedSubjects([...selectedSubjects, subject]);
      // onChange([...selectedSubjects, subject]);
    }
    setInputValue('');
    setFilteredSubjects(subjects=>subjects.filter(s => s.id !== subject.id));
    inputRef.current?.focus();
  };

  const handleRemoveSubject = (subject: Subject) => {
    setFilteredSubjects([...filteredSubjects, subject]);
    setSelectedSubjects(selectedSubjects.filter(s => s.id !== subject.id));
    onChange(selectedSubjects.filter(s => s.id !== subject.id));
    console.log("selectedse", selectedSubjects);
    
  };

  return (
    <div className="subject-selector">
      <div className="input-container" onClick={() => inputRef.current?.focus()}>
        {selectedSubjects.map(subject => (
          <span key={subject.id} className="subject-tag">
            <span>
            {subject.name}
            </span>
            <span onClick={() => handleRemoveSubject(subject)}><LuX /></span>
          </span>
        ))}
        <input
          ref={inputRef}
          autoComplete="off"
          name='subject'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedSubjects.length ? '' : 'Select subjects...'}
        />
      </div>
      {isOpen && (
        <div ref={dropdownRef} className="dropdown">
          {filteredSubjects.map(subject => (
            <div
              key={subject.id}
              className="dropdown-item"
              onClick={() => handleSubjectSelect(subject)}
            >
              {subject.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;