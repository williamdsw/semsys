package com.williamdsw.semsys.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.williamdsw.semsys.domain.Address;
import com.williamdsw.semsys.domain.City;
import com.williamdsw.semsys.domain.Country;
import com.williamdsw.semsys.domain.Course;
import com.williamdsw.semsys.domain.Employee;
import com.williamdsw.semsys.domain.MeetingSchedule;
import com.williamdsw.semsys.domain.Person;
import com.williamdsw.semsys.domain.Report;
import com.williamdsw.semsys.domain.SchoolClass;
import com.williamdsw.semsys.domain.State;
import com.williamdsw.semsys.domain.Student;
import com.williamdsw.semsys.domain.dto.CountryDTO;
import com.williamdsw.semsys.domain.dto.CourseDTO;
import com.williamdsw.semsys.domain.enums.Profile;
import com.williamdsw.semsys.domain.mock.AddressMock;
import com.williamdsw.semsys.domain.mock.CityMock;
import com.williamdsw.semsys.domain.mock.MeetingScheduleMock;
import com.williamdsw.semsys.domain.mock.ReportMock;
import com.williamdsw.semsys.domain.mock.SchoolClassMock;
import com.williamdsw.semsys.domain.mock.StateMock;
import com.williamdsw.semsys.domain.newdto.EmployeeNewDTO;
import com.williamdsw.semsys.domain.newdto.StudentNewDTO;
import com.williamdsw.semsys.repositories.AddressRepository;
import com.williamdsw.semsys.repositories.CityRepository;
import com.williamdsw.semsys.repositories.CountryRepository;
import com.williamdsw.semsys.repositories.CourseRepository;
import com.williamdsw.semsys.repositories.MeetingScheduleRepository;
import com.williamdsw.semsys.repositories.PersonRepository;
import com.williamdsw.semsys.repositories.ReportRepository;
import com.williamdsw.semsys.repositories.SchoolClassRepository;
import com.williamdsw.semsys.repositories.StateRepository;
import com.williamdsw.semsys.services.utils.FileService;

@Service
public class MockDatabaseService {
	
	private final String[] BASE_FOLDERS = {
		"com", "williamdsw", "semsys", "json"	
	};

	@Autowired
	private PersonRepository<Person> personRepository;
	
	@Autowired
	private CountryRepository countryRepository;
	
	@Autowired
	private StateRepository stateRepository;
	
	@Autowired
	private CityRepository cityRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private SchoolClassRepository schoolClassRepository;
	
	@Autowired
	private MeetingScheduleRepository meetingScheduleRepository;
	
	@Autowired
	private ReportRepository reportRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private FileService fileService;

	// HELPER FUNCTIONS

	public void mockDatabase() throws Exception {
		String countriesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "countries.json"), true);
		String statesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "states.json"), true);
		String citiesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "cities.json"), true);
		String coursesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "courses.json"), true);
		String schoolClassesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "school-classes.json"), true);
		String employeesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "employees.json"), true);
		String studentsJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "students.json"), true);
		String addressesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "addresses.json"), true);
		String meetingSchedulesJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "meeting-schedules.json"), true);
		String reportsJson = fileService.loadFileContent(fileService.buildFilePath(BASE_FOLDERS, "reports.json"), true);

		List<CountryDTO> listCountryDtos = Arrays.asList(new ObjectMapper().readValue(countriesJson, CountryDTO[].class));
		List<StateMock> listStateMocks = Arrays.asList(new ObjectMapper().readValue(statesJson, StateMock[].class));
		List<CityMock> listCityMocks = Arrays.asList(new ObjectMapper().readValue(citiesJson, CityMock[].class));
		List<CourseDTO> listCourseDtos = Arrays.asList(new ObjectMapper().readValue(coursesJson, CourseDTO[].class));
		List<SchoolClassMock> listSchoolClassMocks = Arrays.asList(new ObjectMapper().readValue(schoolClassesJson, SchoolClassMock[].class));
		List<EmployeeNewDTO> listEmployeeDtos = Arrays.asList(new ObjectMapper().readValue(employeesJson, EmployeeNewDTO[].class));
		List<StudentNewDTO> listStudentDtos = Arrays.asList(new ObjectMapper().readValue(studentsJson, StudentNewDTO[].class));
		List<AddressMock> listAddressMocks = Arrays.asList(new ObjectMapper().readValue(addressesJson, AddressMock[].class));
		List<MeetingScheduleMock> listMeetingScheduleMocks = Arrays.asList(new ObjectMapper().readValue(meetingSchedulesJson, MeetingScheduleMock[].class));
		List<ReportMock> listReportMocks = Arrays.asList(new ObjectMapper().readValue(reportsJson, ReportMock[].class));

		List<Country> listCountries = listCountryDtos.stream().map(dto -> dto.toCountry()).collect(Collectors.toList());
		List<State> listStates = listStateMocks.stream().map(mock -> mock.toState(listCountries)).collect(Collectors.toList());
		List<City> listCities = listCityMocks.stream().map(mock -> mock.toCity(listStates)).collect(Collectors.toList());
		List<Course> listCourses = listCourseDtos.stream().map(dto -> dto.toCourse()).collect(Collectors.toList());
		List<SchoolClass> listSchoolClasses = listSchoolClassMocks.stream().map(mock -> mock.toSchoolClass(listCourses)).collect(Collectors.toList());
		List<SchoolClass> listClone = List.copyOf(listSchoolClasses);
		final List<Employee> listEmployees = listEmployeeDtos.stream().map(dto -> dto.toEmployee()).collect(Collectors.toList());
		final List<Student> listStudents = listStudentDtos.stream().map(dto -> dto.toStudent(listSchoolClasses)).collect(Collectors.toList());
		List<Address> listAddresses = listAddressMocks.stream().map(mock -> mock.toAddress(listEmployees, listStudents, listCities)).collect(Collectors.toList());
		
		listCourses.forEach(course -> {
			course.getClasses().addAll(listSchoolClasses.stream().filter(sc -> sc.getCourse().getId().equals(course.getId())).collect(Collectors.toList()));
		});
		
		listClone.forEach(obj -> obj.setId(null));
		
		countryRepository.saveAll(listCountries);
		stateRepository.saveAll(listStates);
		cityRepository.saveAll(listCities);
		courseRepository.saveAll(listCourses);
		schoolClassRepository.saveAll(listClone);
				
		for (int index = 0; index < listEmployees.size(); index++) {
			Employee emp = listEmployees.get(index);
			emp.setPassword(passwordEncoder.encode(emp.getPassword()));
			Address address = listAddresses.stream().filter(addr -> addr.getPerson().getId().equals(emp.getId())).findFirst().get();
			emp.setAddress(address);

			if (index == 0) {
				emp.addProfile(Profile.ADMIN);
			}
		}
		
		listStudents.forEach(student -> {
			student.setPassword(passwordEncoder.encode(student.getPassword()));			
			Address address = listAddresses.stream().filter(addr -> addr.getPerson().getId().equals(student.getId())).findFirst().get();
			student.setAddress(address);
			
			for(SchoolClass schoolClass : listSchoolClasses) {
				if (student.getSchoolClass().getId().equals(schoolClass.getId())) {
					schoolClass.getStudents().add(student);
				}
			}
		});
		
		List<Employee> listCopyOfEmployees = personRepository.saveAll(listEmployees);
		List<Student> listCopyOfStudent = personRepository.saveAll(listStudents);
		addressRepository.saveAll(listAddresses);
		
		List<MeetingSchedule> listMeetingSchedules = listMeetingScheduleMocks.stream().map(mock -> mock.toMeetingSchedule(listCopyOfEmployees, listCopyOfStudent)).collect(Collectors.toList());
		List<Report> listReports = listReportMocks.stream().map(mock -> mock.toReport(listMeetingSchedules)).collect(Collectors.toList());
		
		listCopyOfEmployees.forEach(emp -> {
			emp.getSchedules().addAll(listMeetingSchedules.stream().filter(sc -> sc.getEmployee().getSocialSecurityNumber().equals(emp.getSocialSecurityNumber())).collect(Collectors.toList()));
		});
		
		listCopyOfStudent.forEach(student -> {
			student.getSchedules().addAll(listMeetingSchedules.stream().filter(sc -> sc.getStudent().getSocialSecurityNumber().equals(student.getSocialSecurityNumber())).collect(Collectors.toList()));
		});

		listMeetingSchedules.forEach(schedule -> {
			for (Report report : listReports) {
				if (report.getSchedule().getId().equals(schedule.getId())) {
					schedule.setReport(report);
				}
			}
		});
				
		meetingScheduleRepository.saveAll(listMeetingSchedules);
		reportRepository.saveAll(listReports);
	}
}